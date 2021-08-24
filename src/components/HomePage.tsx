import React, { useState } from "react";
import styled from "styled-components";
import { mockData } from "./mockData";

const QUESTION_NUMBER_START = 1;
const EMPTY_FLASH_CARD = {
  front: "",
  back: "",
};

const Wrapper = styled.div`
  padding: 24px;
`;

const PromptText = styled.p`
  text-align: center;
`;

const FlashCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 24px;
`;

const FlashCard = styled.div`
  width: 300px;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #000000;
  border-radius: 6px;
  box-shadow: 2px 2px 4px #888888;
`;

const FlashCardText = styled.p`
  font-size: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto 0;
`;

const Button = styled.button`
  min-width: 200px;
  padding: 8px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 56px;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  padding: 24px;
  border: 1px solid #000000;
`;

const FormField = styled.div`
  display: grid;
  grid-gap: 8px;
`;

const FormLabel = styled.label``;
const FormInput = styled.input``;

export interface IFlashCard {
  front: string;
  back: string;
}

export const HomePage = (): JSX.Element => {
  const [flashCards, setFlashCards] = useState<IFlashCard[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(
    QUESTION_NUMBER_START
  );
  const [isShowQuestion, setIsShowQuestion] = useState<boolean>(true);
  const [formFields, setFormFields] = useState<IFlashCard>(EMPTY_FLASH_CARD);

  const currentflashCard = flashCards[questionNumber - 1];
  const isInvalidInput = formFields.front === "" || formFields.back === "";

  const loadMockData = () => {
    setFlashCards(mockData);
  };

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

  const handleOnSubmit = () => {
    if (isInvalidInput) {
      return;
    }

    setFlashCards([
      ...flashCards,
      { front: formFields.front, back: formFields.back },
    ]);

    const resetFormFields = () => setFormFields(EMPTY_FLASH_CARD);
    resetFormFields();
  };

  return (
    <Wrapper>
      {!flashCards.length ? (
        <>
          <PromptText>
            <b>Add a card to begin</b>
            <br />
            <br />
            or
          </PromptText>
          <ButtonWrapper>
            <Button onClick={loadMockData}>Load mock data</Button>
          </ButtonWrapper>
        </>
      ) : (
        <>
          <FlashCardWrapper>
            <FlashCard>
              <FlashCardText>
                {isShowQuestion
                  ? currentflashCard.front
                  : currentflashCard.back}
              </FlashCardText>
            </FlashCard>
          </FlashCardWrapper>

          <ButtonWrapper>
            <Button onClick={handleOnClick}>
              {isShowQuestion ? "Reveal answer" : "Next card"}
            </Button>
          </ButtonWrapper>
        </>
      )}

      <FormWrapper>
        <Form>
          <FormField>
            <FormLabel htmlFor="front-field">Front</FormLabel>
            <FormInput
              type="text"
              id="front-field"
              value={formFields.front}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormFields({ ...formFields, front: e.target.value })
              }
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="back-field">Back</FormLabel>
            <FormInput
              type="text"
              id="back-field"
              value={formFields.back}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormFields({ ...formFields, back: e.target.value })
              }
            />
          </FormField>

          <Button
            type="button"
            onClick={handleOnSubmit}
            disabled={isInvalidInput}
          >
            Add new card
          </Button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
