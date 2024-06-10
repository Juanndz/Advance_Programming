from frontend.main import admin
from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('register/', views.register, name='register'),
    path('workspaces/', views.workspaces, name='workspaces'),
]