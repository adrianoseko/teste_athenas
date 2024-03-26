from django.db import models

class Pessoa(models.Model):
    id = models.AutoField(primary_key=True) 
    pNome = models.CharField(max_length=100)
    pData = models.DateField() 
    pSexo = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')))  
    pCpf = models.CharField(max_length=14, unique=True) 
    pAltura = models.FloatField() 
    pPeso = models.FloatField(blank=True, null=True) 