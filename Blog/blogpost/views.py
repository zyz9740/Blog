from .models import Question,Choice
from django.urls import reverse
from django.shortcuts import get_object_or_404, render
from django.http import  HttpResponse, HttpResponseRedirect,Http404
from django.template import loader
from django.views import generic
from django.utils import timezone


'''
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    # output = ', '.join([q.question_text for q in latest_question_list])
    # 载入 blogpost/index.html 模板文件，但是有render就不需要创建了
    # template = loader.get_template('blogpost/index.html')
    # 向它传递一个上下文(context)。这个上下文是一个字典，它将模板内的变量映射为 Python 对象。
    context = {
        'latest_question_list': latest_question_list,
    }
    return render(request, 'blogpost/index.html', context)

def detail(request, question_id):
    # try:
    #    question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #   raise Http404("Question does not exist lalala")
    # 这一个可以代替上面那一大堆
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'blogpost/detail.html', {'question': question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'blogpost/results.html', {'question': question})
'''
# 以上被称为"艰难的开发"

class IndexView(generic.ListView):
    template_name = 'blogpost/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """
        Return the last five published questions (not including those set to be
        published in the future).
        """
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).order_by('-pub_date')[:5]
    # Question.objects.filter(pub_date__lte=timezone.now())
    # returns a queryset containing Questions whose pub_date is less than or equal to -
    # that is, earlier than or equal to - timezone.now.


class DetailView(generic.DetailView):
    model = Question
    template_name = 'blogpost/detail.html'

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'blogpost/results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        # request.POST 是一个类字典对象，让你可以通过关键字的名字获取提交的数据。
        # 这个例子中， request.POST['choice'] 以字符串形式返回选择的 Choice 的 ID。 request.POST 的值永远是字符串。
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    # 如果在 request.POST['choice'] 数据中没有提供 choice ， POST 将引发一个 KeyError
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'blogpost/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.As the Python comment above points out,
        # you should always return an HttpResponseRedirect after successfully
        #  dealing with POST data. This tip isn't specific to Django; it's
        # just good Web development practice.
        return HttpResponseRedirect(reverse('blogpost:results', args=(question.id,)))