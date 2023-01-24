from rest_framework import Response, status
from rest_framework.decorators import api_view
from .models import Paper

@api_view(['GET'])
def papers(request):
  papers = Paper.objects.all()
  serializer = PaperSerializer(papers, many=True)
  return Response(serializer.data,status.HTTP_200_OK)