from django.urls import path,include,re_path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from .views import home

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('api/',include('api.urls')), 
    path('admin/',admin.site.urls),
    re_path(r'^.*/$',home,name='home')
] 