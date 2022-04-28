from email import message
import re
from tkinter.tix import Tree
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from api.serializers import *
from datetime import datetime
from rest_framework import mixins
from rest_framework import status
import json
from jsonschema import validate, ValidationError


class RegistrationAPIView(APIView):
    """
    Registers a new user.
    """
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request):
        """
        Creates a new User object.
        Username, email, and password are required.
        Returns a JSON web token.
        """
        # print(request.body)
        d = request.data
        number = d.get('number')
        print(number)
        try:
            us = User.objects.get(username = number)
            return Response({'message':'user with this number already exists!'})
        except:
            pass
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                'token': serializer.data.get('token', None),
            },
            status=status.HTTP_201_CREATED,
        )

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            print(serializer.errors)
            raise Http404
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListCar(APIView):
    def get(self, request):
        params = request.query_params
        a = [[],[],[],[],[],]
        a[0] = [params.get('mark', []), 'mark']
        a[1] = [params.get('type', []), 'type']
        a[2] = [params.get('model', []), 'model']
        a[3] = [params.get('year', []), 'year']
        a[4] = [params.get('name', []), 'name']
        d = {}
        for aa in a:
            if len(aa[0]):
                d[aa[1]] = int(aa[0])
        print(d)
        que = Auto.objects.all().filter(**d)
        ser = AutoSerializer(que, many=True)
        print(ser.data)
        return Response(ser.data)

class ListMark(APIView):
    def get(self, request):
        que = Mark.objects.all()
        ser = MarkSerializer(que, many=True)
        return Response(ser.data)

class ListModel(APIView):
    def get(self, request):
        mark = request.query_params.get('mark', None)
        que = CarModel.objects.all()
        if mark is not None:
            que = CarModel.objects.all().filter(mark=mark)
        ser = CarModelSerializer(que, many=True)
        return Response(ser.data)

class Years(APIView):
    def get(self, request):
        model = request.query_params.get('model', None)
        que = Auto.objects.all().filter(model=model)
        ser = GetYearSerializer(que, many=True)
        # print(ser.data)
        return Response(ser.data)



# class CarAPIView(generics.):
POST_VALIDATOR = {
    '$schema':'https://json-schema.org/schema#',
    'type':'object',
    'properties':{
        'title':{
            'type':'string',
            'minLength':10,
            'maxLength':32
        },
        'description':{
            'type':'string',
            'minLength':5,
            'maxLength':500
        },
        'price':{
            'type':'number',
            'exclusiveminimum':0,
        },
        'mileage':{
            'type':'integer',
            'minimum':0
        },
        'city':{
            'type':'string',
            'minLength':2
        },
        'color':{
            'type':'string',
            'minLength':3
        },
        'car':{
            'type':'integer'
        }
    },
    'required':['title','description','price','mileage','city','color','car']
}
class ListPost(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    def get(self, request):
        params = request.query_params
        print(params)
        car = params.get('car', None)
        if car is None:
            que = Posts.objects.all().order_by('seen_count')[:20]
        else:
            que = Posts.objects.all().filter(car__pk=car).order_by('seen_count')[:20] 
        ser = getPostSerializer(que, many=True)
        return Response(ser.data)
    def post(self, request):
        date = datetime.today().strftime('%Y-%m-%d')
        data = request.data
        data['poster'] = request.user.id
        data['car'] = int(data['car'])
        data['price'] = int(data['price'])
        data['mileage'] = int(data['mileage'])
        print(data)
        try:
            validate(data, POST_VALIDATOR)
        except ValidationError as e:
            return Response({"message":e.message})
        ser = postPostSerilizer(data=data)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)


class PostAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    def get(self, request, id):
        obj = get_object_or_404(Posts, id=id)
        ser = getPostSerializer(obj)
        return Response(ser.data)
    def delete(self, request, id):
        obj = get_object_or_404(Posts, id=id)
        ser = getPostSerializer(obj)
        obj.delete()
        return Response(ser.data)
    def put(self, request,  id):
        obj = get_object_or_404(Posts, id=id)
        data = request.data
        data['poster'] = request.user.id
        data['car'] = int(data['car'])
        data['price'] = int(data['price'])
        data['mileage'] = int(data['mileage'])
        ser = postPostSerilizer(data=data)
        try:
            validate(data, POST_VALIDATOR)
        except ValidationError as e:
            return Response({"message":e.message})
        ser.is_valid(raise_exception=True)
        obj.car = get_object_or_404(Auto, pk=ser.data['car'])
        obj.title = ser.data['title']
        obj.description = ser.data['description']
        obj.price = ser.data['price']
        obj.city = ser.data['city']
        obj.mileage = ser.data['mileage']
        obj.color = ser.data['color']
        obj.save()
        return Response({'success':True})

class MyPost(APIView):
    def get(self, request):
        # print(request.user)
        ser = getPostSerializer(Posts.objects.all().filter(poster=request.user), many=True)
        return Response(ser.data)