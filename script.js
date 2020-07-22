class Quiz {
  constructor(questionBlocksClass, nextBtnClass, checkoutBlockClass, questionBtnWrapperClass) {
    this.questionBlocks = document.querySelectorAll(questionBlocksClass);
    this.checkoutBlock = document.querySelector(checkoutBlockClass);
    this.nextBtns = document.querySelectorAll(nextBtnClass);
    this.questionButtonWrappers = document.querySelectorAll(questionBtnWrapperClass);

    this.state = {
      currentQuestionBlock: 1,
      status: '',
    }
  }

  init() {
    this.hideQuestions();
    this.showCurrentQuestionBlock();
    this.addListeners();
  }


  addListeners() {
    this.nextBtns.forEach(btn => btn.addEventListener('click', this.changeQuestionBlock));
    this.questionBlocks[1].querySelector('.question-wrapper').addEventListener('click', this.setStatus.bind(this));
  }

  setStatus(e) {
    
    let target = e.target;
    if (target.className !== 'question' && target.tagName === 'P' && target.tagName !== "DIV") {
      target = target.parentNode;
    }

    if(target.className !== 'question') {
      this.state.status = target.id;
    }    
  }


  hideQuestions() {
    this.questionBlocks.forEach(block => {
        block.style.display = 'none';
    });

    this.checkoutBlock.style.display = 'none';
  }

  showCurrentQuestionBlock() {
    this.questionBlocks.forEach(block => {
      const blockId = block.id;
      const prefix = 'questions';
      const currentBlock = prefix + this.state.currentQuestionBlock;
      
      if (blockId === currentBlock) {
        block.style.display = 'block';
      }
    });
    this.checkoutBlock.style.display = 'none';
    
    if (this.state.currentQuestionBlock === 6) {
      this.checkoutBlock.style.display = 'block';
    }
  }

  changeQuestionBlock = () => {
    let currentBlockNumber = this.state.currentQuestionBlock;
    const status = this.state.status;

    switch(currentBlockNumber) {
      case 1: this.state.currentQuestionBlock = 2;
      this.hideQuestions();
      this.showCurrentQuestionBlock();
      break;
      case 2: 
      if (status === 'prepare') {
        this.state.currentQuestionBlock = 3;
        this.hideQuestions();
        this.showCurrentQuestionBlock();
      } else if (status === 'trip') {
        this.state.currentQuestionBlock = 4;
        this.hideQuestions();
        this.showCurrentQuestionBlock();
      } else if (status === 'back') {
        this.state.currentQuestionBlock = 5;
        this.hideQuestions();
        this.showCurrentQuestionBlock();
      } else if (status === '') {
        alert('Выберите ответ')
      }
      break;
      case 3:
      case 4: 
      case 5: 
      this.state.currentQuestionBlock = 6;
      this.hideQuestions();
      this.showCurrentQuestionBlock();
    }
  }
}

const quiz = new Quiz('.questions-block', '.next-btn', '.checkout-block', '.question-wrapper');
quiz.init();