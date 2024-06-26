

from django.urls import path, include
from api.views import CreateUserView,NoteListCreateView,DeleteNoteView

urlpatterns = [
    
    path('user/register/', CreateUserView.as_view(), name="register" ),
    path('notes/', NoteListCreateView.as_view(), name='list-note'),
    path('note/delete/<int:pk>/', DeleteNoteView.as_view(), name='delete-note'),

]