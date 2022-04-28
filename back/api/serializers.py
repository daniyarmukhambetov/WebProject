from pyexpat import model
from attr import field
from rest_framework import serializers
from jsonschema import validate, ValidationError
from api.models import *
from django.contrib.auth import authenticate





class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = ['id', 'name']

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = '__all__'

class AutoSerializer(serializers.ModelSerializer):
    mark = MarkSerializer()
    model = CarModelSerializer()
    car_type = TypeSerializer()
    class Meta:
        model = Auto
        fields = ['id', 'name', 'mark', 'model', 'car_type', 'year', 'engine']
class GetYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto
        fields = ['year']
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'number']
class postPostSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['id', 'title', 'description', 'price', 'city', 'car', 'mileage', 'color', 'poster', 'seen_count']
class getPostSerializer(serializers.ModelSerializer):
    poster = UserSerializer()
    car = AutoSerializer()
    class Meta:
        model = Posts
        fields = ['id', 'title', 'description', 'price', 'city', 'car', 'mileage', 'color', 'poster', 'seen_count']
class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ('number', 'password', 'token',)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    """
    Authenticates an existing user.
    Email and password are required.
    Returns a JSON web token.
    """
    number = serializers.CharField(max_length=64, write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    # Ignore these fields if they are included in the request.
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        """
        Validates user data.
        """
        print(data)
        number = data.get('number', None)
        password = data.get('password', None)

        if number is None:
            raise serializers.ValidationError(
                'An number is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(username=number, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this number and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        return {
            'token': user.token,
        }
