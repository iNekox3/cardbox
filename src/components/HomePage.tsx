import React, { useState } from "react";
import styled from "styled-components";

const QUESTION_NUMBER_START = 1;

const Wrapper = styled.div`
  padding: 24px;
`;

const FlashCardWrapper = styled.div`
  max-width: 200px;
  margin: 0 auto;
`;

const FlashCard = styled.div`
  padding: 16px;
  border: 1px solid #000000;
  border-radius: 6px;
  box-shadow: 2px 2px 4px #888888;
`;

const FlashCardText = styled.p``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px auto 0;
`;

const Button = styled.button`
  min-width: 200px;
  padding: 8px;
`;

interface IFlashCard {
  front: string;
  back: string;
}

const flashCards: IFlashCard[] = [
  { front: "評判", back: "ひょう　ばん" },
  { front: "指名", back: "し　めい" },
  { front: "お得意さん", back: "お　とく　い　さん" },
];

export const HomePage = (): JSX.Element => {
  const [questionNumber, setQuestionNumber] = useState<number>(
    QUESTION_NUMBER_START
  );
  const [isShowQuestion, setIsShowQuestion] = useState<boolean>(true);

  const currentflashCard = flashCards[questionNumber - 1];

  const increaseQuestionNumber = () => {
    const isLastCard = questionNumber === flashCards.length;
    if (isLastCard) {
      const resetQuestionNumber = () =>
        setQuestionNumber(QUESTION_NUMBER_START);
      resetQuestionNumber();
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handleOnClick = () => {
    if (isShowQuestion) {
      const revealAnswer = () => setIsShowQuestion(false);
      revealAnswer();
    } else {
      const showNextCard = () => setIsShowQuestion(true);
      showNextCard();
      increaseQuestionNumber();
    }
  };

  return (
    <Wrapper>
      <FlashCardWrapper>
        <FlashCard>
          <FlashCardText>
            {isShowQuestion ? currentflashCard.front : currentflashCard.back}
          </FlashCardText>
        </FlashCard>
      </FlashCardWrapper>

      <ButtonWrapper>
        <Button onClick={handleOnClick}>
          {isShowQuestion ? "Reveal answer" : "Next card"}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
