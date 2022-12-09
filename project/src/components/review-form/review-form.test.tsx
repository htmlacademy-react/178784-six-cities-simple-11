import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { LOW_COMMENT_LIMIT } from '../../constants/const';
import { APIRoute } from '../../enums/api-route.enum';
import { getFakeStoreCreator, getFakeStoreCreatorWithMockApi, makeFakeComment, makeFakeComments, makeFakeOffer, makeFakeText } from '../../mocks/mocks';
import ReviewForm from './review-form';

const mockStoreCreator = getFakeStoreCreator();

describe('Review form component', () => {
  it('Should be disabled all fields and submit if сomment sending', () => {
    const offer = makeFakeOffer();
    const comments = makeFakeComments();
    const store = mockStoreCreator({
      OFFER_DATA: { comments, isCommentSending: true },
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={offer.id} />
      </Provider>
    );

    expect(screen.getByTestId('1-stars')).toBeDisabled();
    expect(screen.getByTestId('2-stars')).toBeDisabled();
    expect(screen.getByTestId('3-stars')).toBeDisabled();
    expect(screen.getByTestId('4-stars')).toBeDisabled();
    expect(screen.getByTestId('5-stars')).toBeDisabled();
    expect(screen.getByTestId('review')).toHaveAttribute('readOnly');
    expect(screen.getByTestId('submit')).toBeDisabled();
  });

  it('Should be enable all fields if сomment not sending', () => {
    const offer = makeFakeOffer();
    const comments = makeFakeComments();
    const store = mockStoreCreator({
      OFFER_DATA: { comments, isCommentSending: false },
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={offer.id} />
      </Provider>
    );

    expect(screen.getByTestId('1-stars')).not.toBeDisabled();
    expect(screen.getByTestId('2-stars')).not.toBeDisabled();
    expect(screen.getByTestId('3-stars')).not.toBeDisabled();
    expect(screen.getByTestId('4-stars')).not.toBeDisabled();
    expect(screen.getByTestId('5-stars')).not.toBeDisabled();
    expect(screen.getByTestId('review')).not.toHaveAttribute('readOnly');
  });

  it('Should be disable submit if review field not valid', async () => {
    const offer = makeFakeOffer();
    const comments = makeFakeComments();
    const store = mockStoreCreator({
      OFFER_DATA: { comments, isCommentSending: false },
      OFFER_PROCESS: {}
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={offer.id} />
      </Provider>
    );

    expect(screen.getByTestId('submit')).toBeDisabled();

    await userEvent.type(screen.getByTestId('review'), makeFakeText(51));

    expect(screen.getByTestId('submit')).toBeDisabled();

    await userEvent.click(screen.getByTestId('4-stars'));

    expect(screen.getByTestId('submit')).toBeEnabled();

    await userEvent.clear(screen.getByTestId('review'));

    expect(screen.getByTestId('submit')).toBeDisabled();

    await userEvent.type(screen.getByTestId('review'), makeFakeText(LOW_COMMENT_LIMIT));

    expect(screen.getByTestId('submit')).toBeDisabled();

    await userEvent.type(screen.getByTestId('review'), makeFakeText(1));

    expect(screen.getByTestId('submit')).toBeEnabled();
  });


  it('Should be reset if success submit', async () => {
    const offer = makeFakeOffer();
    const comments = makeFakeComments();
    const store = mockStoreCreator({
      OFFER_DATA: { comments, isCommentSending: false },
      OFFER_PROCESS: {}
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={offer.id} />
      </Provider>
    );

    const validComment = makeFakeText(51);
    await userEvent.type(screen.getByTestId('review'), validComment);
    await userEvent.click(screen.getByTestId('4-stars'));


    expect(screen.getByTestId('review').textContent).toBe(validComment);
    expect(screen.getByTestId('4-stars')).toBeChecked();

    expect(screen.getByTestId('submit')).toBeEnabled();

    await userEvent.click(screen.getByTestId('submit'));

    setTimeout(() => {
      expect(screen.getByTestId('review').textContent).toBe('');
      expect(screen.getByTestId('4-stars')).not.toBeChecked();
    }, 4000);
  });


  it('Should not be reset if failed submit', async () => {
    const offer = makeFakeOffer();
    const comments = makeFakeComments();
    const [storeCreator, mockApi] = getFakeStoreCreatorWithMockApi();
    const store = storeCreator({
      OFFER_DATA: { comments, isCommentSending: false },
      OFFER_PROCESS: {}
    });

    const comment = makeFakeComment();

    mockApi
      .onPost(`${APIRoute.OfferComments}/${comment.id}`, comment)
      .abortRequest();

    render(
      <Provider store={store}>
        <ReviewForm offerId={offer.id} />
      </Provider>
    );

    await userEvent.type(screen.getByTestId('review'), comment.comment);
    await userEvent.click(screen.getByTestId('4-stars'));


    expect(screen.getByTestId('review').textContent).toBe(comment.comment);
    expect(screen.getByTestId('4-stars')).toBeChecked();

    expect(screen.getByTestId('submit')).toBeEnabled();

    await userEvent.click(screen.getByTestId('submit'));

    expect(screen.getByTestId('review').textContent).toBe(comment.comment);
    expect(screen.getByTestId('4-stars')).toBeChecked();
  });
});
