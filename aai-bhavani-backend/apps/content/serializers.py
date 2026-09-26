from rest_framework import serializers
from apps.content.models import Testimonial, TeamMember, FAQ


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id', 'client_name', 'photo', 'rating', 'review', 'location', 'order']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeamMember
        fields = ['id', 'photo', 'name', 'designation', 'description',
                  'facebook', 'instagram', 'linkedin', 'order']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = ['id', 'question', 'answer', 'order']


class TestimonialAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id', 'client_name', 'photo', 'rating', 'review',
                  'location', 'is_active', 'order']
        read_only_fields = ['id', 'photo']


class TeamMemberAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeamMember
        fields = ['id', 'photo', 'name', 'designation', 'description',
                  'facebook', 'instagram', 'linkedin', 'order', 'is_active']
        read_only_fields = ['id', 'photo']


class FAQAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = ['id', 'question', 'answer', 'order', 'is_active']
        read_only_fields = ['id']
