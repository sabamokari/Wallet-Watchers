from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import requests


@csrf_exempt
@require_http_methods(["POST"])
def receive_item_id(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        itemId = data.get('itemId', '')
        print("walmart post")

        # Example of saving itemId to a file (consider using a database in production)
        with open('last_item_id.txt', 'w') as file:
            file.write(itemId)

        return JsonResponse({"status": "success", "itemId": itemId})
    else:
        return JsonResponse({"status": "error", "message": "Only POST requests are allowed"}, status=405)


def get_item_id(request):
    print("hellhhho")
    try:
        with open('last_item_id.txt', 'r') as file:
            itemId = file.read()
        return JsonResponse({"itemId": itemId})
    except FileNotFoundError:
        return JsonResponse({"error": "Item ID not found"}, status=404)


def index(request):
    return render(request, 'index.html')
