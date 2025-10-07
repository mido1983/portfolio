import base64
import json
import os
import re
import time
from typing import Any, Dict, Optional

import resend  # type: ignore

EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_REGEX = re.compile(r"^\+?[0-9\s\-()]{8,20}$")
RATE_LIMIT_WINDOW_SECONDS = 600  # 10 minutes
RATE_LIMIT_MAX_REQUESTS = 5
ALLOWED_ORIGIN = "https://resume.5solo.com"

_rate_limit_store: Dict[str, list[float]] = {}


def _escape_html(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
    )


def _normalize_phone(raw: str) -> str:
    digits = re.sub(r"[^\d]", "", raw)
    if not digits:
        return ""
    return f"+{digits}"


def _get_origin(request: Dict[str, Any]) -> Optional[str]:
    headers = request.get("headers") or {}
    origin = headers.get("origin") or headers.get("Origin")
    return origin if isinstance(origin, str) else None


def _get_client_ip(request: Dict[str, Any]) -> str:
    headers = request.get("headers") or {}
    forwarded_for = headers.get("x-forwarded-for") or headers.get("X-Forwarded-For")
    if isinstance(forwarded_for, str) and forwarded_for.strip():
        return forwarded_for.split(",")[0].strip()

    real_ip = headers.get("x-real-ip") or headers.get("X-Real-IP")
    if isinstance(real_ip, str) and real_ip.strip():
        return real_ip.strip()

    remote_addr = request.get("remoteAddr")
    if isinstance(remote_addr, str) and remote_addr.strip():
        return remote_addr.strip()

    return "unknown"


def _within_rate_limit(client_ip: str) -> bool:
    now = time.time()
    timestamps = _rate_limit_store.setdefault(client_ip, [])
    # keep only timestamps within window
    _rate_limit_store[client_ip] = [ts for ts in timestamps if now - ts <= RATE_LIMIT_WINDOW_SECONDS]
    if len(_rate_limit_store[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        return False
    _rate_limit_store[client_ip].append(now)
    return True


def _build_response(
    status: int,
    body: Optional[Dict[str, Any]] = None,
    origin: Optional[str] = None,
    extra_headers: Optional[Dict[str, str]] = None,
) -> Dict[str, Any]:
    headers = {"Content-Type": "application/json"}
    if origin == ALLOWED_ORIGIN:
        headers.update(
            {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        )

    if extra_headers:
        headers.update(extra_headers)

    body_content = "" if body is None else json.dumps(body)

    return {
        "statusCode": status,
        "headers": headers,
        "body": body_content,
    }


def handler(request: Dict[str, Any]) -> Dict[str, Any]:
    method = str(request.get("method", "GET")).upper()
    origin = _get_origin(request)

    if method == "OPTIONS":
        return _build_response(204, None, origin)

    if method != "POST":
        return _build_response(
            405,
            {"ok": False, "error": "method_not_allowed"},
            origin,
            {"Allow": "POST, OPTIONS"},
        )

    client_ip = _get_client_ip(request)
    if not _within_rate_limit(client_ip):
        print("contact_api.rate_limited", flush=True)
        return _build_response(429, {"ok": False, "error": "rate_limited"}, origin)

    body = request.get("body") or ""
    if request.get("isBase64Encoded"):
        try:
            body = base64.b64decode(body).decode("utf-8")
        except Exception:
            print("contact_api.decode_error", flush=True)
            return _build_response(400, {"ok": False, "error": "invalid_payload"}, origin)

    if not isinstance(body, str):
        print("contact_api.invalid_body_type", flush=True)
        return _build_response(400, {"ok": False, "error": "invalid_payload"}, origin)

    try:
        payload = json.loads(body)
    except json.JSONDecodeError:
        print("contact_api.json_error", flush=True)
        return _build_response(400, {"ok": False, "error": "invalid_json"}, origin)

    company_name = str(payload.get("companyName", "")).strip()
    email = str(payload.get("email", "")).strip()
    phone = str(payload.get("phone", "")).strip()
    message = str(payload.get("message", "")).strip()

    if len(company_name) < 2:
        print("contact_api.validation_error reason=companyName", flush=True)
        return _build_response(400, {"ok": False, "error": "Company name must be at least 2 characters."}, origin)

    if not EMAIL_REGEX.match(email):
        print("contact_api.validation_error reason=email", flush=True)
        return _build_response(400, {"ok": False, "error": "Enter a valid email address."}, origin)

    if not PHONE_REGEX.match(phone):
        print("contact_api.validation_error reason=phone_pattern", flush=True)
        return _build_response(400, {"ok": False, "error": "Enter a valid phone number."}, origin)

    normalized_phone = _normalize_phone(phone)
    digits_only = re.sub(r"[^\d]", "", normalized_phone)
    if not normalized_phone or len(digits_only) < 8 or len(digits_only) > 20:
        print("contact_api.validation_error reason=phone_normalized", flush=True)
        return _build_response(400, {"ok": False, "error": "Enter a valid phone number."}, origin)

    if len(message) < 5:
        print("contact_api.validation_error reason=message", flush=True)
        return _build_response(400, {"ok": False, "error": "Message must be at least 5 characters."}, origin)

    api_key = os.getenv("RESEND_API_KEY")
    if not api_key:
        print("contact_api.missing_resend_api_key", flush=True)
        return _build_response(500, {"ok": False, "error": "Email service unavailable."}, origin)

    resend.api_key = api_key

    html_body = f"""
        <table style="width:100%;max-width:600px;border-collapse:collapse;font-family:Arial,sans-serif;">
          <tbody>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Company</td>
              <td style="padding:8px;border:1px solid #e2e8f0;">{_escape_html(company_name)}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Email</td>
              <td style="padding:8px;border:1px solid #e2e8f0;">{_escape_html(email)}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Phone</td>
              <td style="padding:8px;border:1px solid #e2e8f0;">{_escape_html(normalized_phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;vertical-align:top;">Message</td>
              <td style="padding:8px;border:1px solid #e2e8f0;">{_escape_html(message).replace('\\n', '<br />')}</td>
            </tr>
          </tbody>
        </table>
    """.strip()

    try:
        response = resend.Emails.send(
            {
                "from": "5SOLO Resume <noreply@resume.5solo.com>",
                "to": ["m0504471533@gmail.com"],
                "subject": f"Resume contact: {company_name}",
                "html": html_body,
            }
        )
    except Exception as error:  # pylint: disable=broad-except
        print(f"contact_api.provider_error error={error}", flush=True)
        return _build_response(500, {"ok": False, "error": "email_delivery_failed"}, origin)

    message_id = ""
    if isinstance(response, dict):
        message_id = str(response.get("id") or "")

    return _build_response(200, {"ok": True, "id": message_id}, origin)
