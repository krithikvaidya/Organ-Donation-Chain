curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "org.organ.net.Hospital",
   "hospitalId": "HOSPITALMANIPAL",
   "name": "Manipal Hospital, Mangalore",
   "email": "manipal%40manipal.com",
   "address": "Mangaluru, Karnataka, India",
   "organName": ["EYE", "LUNGS"]
 }' 'http://localhost:3001/api/Hospital'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
    "realm": "",
    "username": "HOSPITALMANIPAL",
    "email": "manipal@manipal.com",
    "emailVerified": true,
    "password": "1"
}' 'http://localhost:3000/api/Users'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.organ.net.Hospital",
   "hospitalId": "HOSPITALAPOLLO",
   "name": "Apollo Hospital, Kolkata",
   "email": "apollo%40apollo.com",
   "address": "Kolkata, West Bengal, India",
   "organName": ["LUNGS", "HEART"]
 }' 'http://localhost:3001/api/Hospital'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
    "realm": "",
    "username": "HOSPITALAPOLLO",
    "email": "apollo@apollo.com",
    "emailVerified": true,
    "password": "1"
}' 'http://localhost:3000/api/Users'

# https://i.imgur.com/Axzh5j7.png