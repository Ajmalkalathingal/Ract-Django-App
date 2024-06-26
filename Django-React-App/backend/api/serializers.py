from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print(user)
        return user    

class NoteSerilzer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title','content','created_at','user']
        extra_kwargs = {"user":{"read_only":True}}
  
    

  
        