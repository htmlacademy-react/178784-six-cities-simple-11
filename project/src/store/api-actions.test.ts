import { Action } from 'redux';
import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { APIRoute } from '../enums/api-route.enum';
import { checkAuthAction, fetchAllOffersAction, fetchNearOffersAction, fetchOfferCommentsAction, loginAction, logoutAction, setCommentAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';
import { makeFakeComment, makeFakeComments, makeFakeId, makeFakeOffers } from '../mocks/mocks';
import { setAllCitiesAction, setNearOffersAction, setOfferCommentsAction } from './offer-data/offer-data';
import { changeActiveCityAction } from './offer-process/offer-process';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should redirect to main and save token when POST /login', async () => {
    const authData: AuthData = { email: '123@mai.ru', password: '123' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(authData));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
  });

  it('should redirect to login and drop token when POST /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should dispatch fetchAllOffersAction, setAllCitiesAction, changeActiveCityAction when GET /offers', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    const res = await store.dispatch(fetchAllOffersAction());
    expect(res.payload).toEqual(mockOffers);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllOffersAction.pending.type,
      setAllCitiesAction.type,
      changeActiveCityAction.type,
      fetchAllOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearOffersAction, setNearOffersAction when GET nearby offers', async () => {
    const mockOffers = makeFakeOffers();
    const mockOfferId = makeFakeId();
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearOffersAction(mockOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      setNearOffersAction.type,
      fetchNearOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferCommentsAction, setOfferCommentsAction when GET offer comments', async () => {
    const mockComments = makeFakeComments();
    const fakeOfferId = makeFakeId();
    mockAPI
      .onGet(`${APIRoute.OfferComments}/${fakeOfferId}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchOfferCommentsAction(fakeOfferId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferCommentsAction.pending.type,
      setOfferCommentsAction.type,
      fetchOfferCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch setCommentAction, setOfferCommentsAction when set comment', async () => {
    const mockComment = makeFakeComment();
    const mockComments = makeFakeComments();
    const fakeOfferId = makeFakeId();
    mockAPI
      .onPost(`${APIRoute.OfferComments}/${fakeOfferId}`, mockComment)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(setCommentAction([fakeOfferId, mockComment]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setCommentAction.pending.type,
      setOfferCommentsAction.type,
      setCommentAction.fulfilled.type
    ]);
  });
});
