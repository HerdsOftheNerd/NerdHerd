from django.urls import path
from questionanswer.views import *
from users.views import login_user,register_user,get_user
from notes.views import notes
from papers.views import papers,paper


urlpatterns = [
  path('questions/',questions),
  path('questions/add',add_question),
  path('questions/<str:pk>',question),
  path('questions/<str:pk>/delete',delete_question),
  path('questions/<str:pk>/edit',edit_question),
  path('questions/<str:pk>/answers',answers),
  path('questions/<str:pk>/answers/<str:ans_pk>',each_answers),
  path('users/login',login_user),
  path('users/register',register_user),
  path("users/", get_user),
  path("notes/",notes),
  path("papers/",papers),
  path("papers/<str:query>",paper)
]
