from pessoa.models import Pessoa
from rest_framework import viewsets
from .serializers import PessoaSerializer

class PessoaViewSet(viewsets.ModelViewSet):
    
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer



