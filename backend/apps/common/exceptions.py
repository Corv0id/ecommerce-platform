from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        error_payload = {
            "error": {
                "code": response.status_code,
                "message": _extract_message(response.data),
                "details": response.data,
            }
        }
        response.data = error_payload
    return response


def _extract_message(data):
    if isinstance(data, dict):
        if "detail" in data:
            detail = data["detail"]
            if isinstance(detail, list) and detail:
                return str(detail[0])
            return str(detail)
        first_key = next(iter(data.keys()), None)
        if first_key and isinstance(data[first_key], list) and data[first_key]:
            return f"{first_key}: {data[first_key][0]}"
    return "Request could not be processed."
