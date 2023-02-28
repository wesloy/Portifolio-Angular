export class Todo {
    /**
     * Criando dentro do método construtor a model, não tem necessidade de instanciar
     * e tbm adiciona a intelisense
     **/
    constructor(
        public id: number = 1,
        public title: string = "",
        public done: boolean = false,
    ) { }
}