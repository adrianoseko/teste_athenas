from pessoa.models import Pessoa

from rest_framework import serializers, status
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.db.migrations import serializer
import traceback
from django.http import HttpResponse

class PessoaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pessoa
        fields = '__all__'


