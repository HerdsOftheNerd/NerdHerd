from django.contrib import admin
from .models import Note,Comment,Review, Transaction

admin.site.register(Note)
admin.site.register(Comment)
admin.site.register(Review)
admin.site.register(Transaction)