import requests

url = 'http://192.168.1.109:3000/data'
query = {
    "title": "SASDSA Book",
    "price": 300.09,
    "read": True
}
res = requests.post(url, json=query)
print(res.text)