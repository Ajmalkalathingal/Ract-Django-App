from rest_framework import generics
from django.contrib.auth.models import User
from .models import Note
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from api.serializers import UserSerializer, NoteSerilzer


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerilzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class UpdateNoteView(generics.UpdateAPIView):
    serializer_class = NoteSerilzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)           


class DeleteNoteView(generics.DestroyAPIView):
    serializer_class = NoteSerilzer  
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
