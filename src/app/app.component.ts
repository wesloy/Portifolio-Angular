import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode: string = 'list';
  public tema: string = 'Minha lista';
  public todos: Todo[] = [];
  public form: FormGroup;



  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();

  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title))
    this.save();
    this.clear();
  }

  save() {
    localStorage.setItem('bdLocalTodos', JSON.stringify(this.todos));
    this.mode = 'list';
  }

  load() {
    this.todos = JSON.parse(localStorage.getItem('bdLocalTodos') || '[]');
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    // index de lista qdo vazio é menos 1
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }


  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }


  changeMode(mode: string) {
    this.mode = mode;
  }

}
