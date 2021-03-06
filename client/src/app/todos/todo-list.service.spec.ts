import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
    {
      _id: '46s4fgh19s8gh54981564sh',
      owner: 'Socrates',
      status: true,
      body: ': And does the same apply to this as the previous ones: it is not ' +
      'because it is a loved thing that it is loved by those who love it, but it is a ' +
      'loved thing because it is loved?',
      category: 'Euthyphro',
    },
    {
      _id: '56s2fg2sdf8g489s4y9s29hh',
      owner: 'Dionysus',
      status: false,
      body: 'I can\'t describe it. \n' +
      'But yet I\'ll tell you in a riddling way. \n' +
      'Have you e\'er felt a sudden lust for soup?',
      category: 'Frogs',
    },
    {
      _id: '5189ser4y56se1g89sg614',
      owner: 'Heracles',
      status: true,
      body: 'Soup! Zeus-a-mercy, yes, ten thousand times.',
      category: 'Frogs',
    },
    {
      _id: 'g89189s1g6g179s8g4s6d8g54s',
      owner: 'Descartes',
      status: false,
      body: 'Then without doubt I exist also ' +
      'if he deceives me, and let him deceive me as much as he will, he can ' +
      'never cause me to be nothing so long as I think that I am something. ',
      category: 'Meditations',
    }
  ];
  let todoListService: TodoListService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoListService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });
});
