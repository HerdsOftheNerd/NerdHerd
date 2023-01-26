from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from .serializers import PaperSerializer,PaperValidator
from .models import Paper
from django.db.models import Q
from PIL import Image
import PIL
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def resize(path):
  img = Image.open(path)
  img.thumbnail((1000,1000))
  img.save(path)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def papers(request):
  if request.method == "GET":
    query = request.GET.get('search')
    if query:
      papers = Paper.objects.filter(Q(subject__icontains = query)|Q(school__icontains = query)|Q(year = query)|Q(exam__icontains = query)|Q(standard = query))
      serializer = PaperSerializer(papers, many=True)
      return Response(serializer.data,status.HTTP_200_OK)
    papers = Paper.objects.all()
    serializer = PaperSerializer(papers, many=True)
    return Response(serializer.data,status.HTTP_200_OK)
  else:
    serializer = PaperValidator(data=request.data)
    if serializer.is_valid():
      paper = Paper()
      paper.author = request.user.profile
      paper.exam = serializer.validated_data['exam']
      paper.pdf = serializer.validated_data['pdf']
      paper.school = serializer.validated_data['school']
      paper.standard = serializer.validated_data['standard']
      paper.subject = serializer.validated_data['subject']
      paper.thumbnail = serializer.validated_data['thumbnail']
      paper.year = serializer.validated_data['year']
      if serializer.validated_data['duration'] < 240:
        paper.duration = serializer.validated_data['duration'] * 60000
      else:
        paper.duration = 2 * 60 * 60000
      paper.save()
      path = f"/Users/deveshkedia/Desktop/Development/Projects/Doing/NerdHerd/mediafiles/{str(paper.thumbnail)}"
      resize(path)
      return Response(PaperSerializer(paper).data,status.HTTP_201_CREATED)
    else:
      return Response({
        "error":serializer.errors
      },status.HTTP_200_OK)

@api_view(['GET'])
def paper(request,pk):
  paper = Paper.objects.get(id=pk)
  serializer = PaperSerializer(paper)
  return Response(serializer.data,status.HTTP_200_OK)
  
