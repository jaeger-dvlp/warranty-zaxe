import getRandomSerial from './RandomSerial';

// the fucking webpack doesn't allow to use object destructuring for process.env, so we have to do this
// eslint-disable-next-line prefer-destructuring
const APP_ENV = process.env.APP_ENV;

const insertDemoRow = async ({ supaBase, onComplete = () => null }) => {
  try {
    if (APP_ENV !== 'development') return false;

    const { error } = await supaBase.from('warrantyList').insert({
      deviceSerialNumber: getRandomSerial(),
      purchaseDate: '22/12/2020',
      name: 'John',
      surname: 'Doe',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+90 555 555 55 55',
      country: 'Germany',
      invoiceImage:
        'https://drive.google.com/file/d/1h0wjsiXhDxE5WDtAboQ3WQAM5AIxYdCh/view?usp=share_link',
      companyName: 'Example Ltd.',
      distributorName: 'Zaxe3D',
    });

    if (error) {
      throw new Error(
        error?.message || 'An error occurred while inserting row.'
      );
    }

    return onComplete();
  } catch (error) {
    return false;
  }
};

export default insertDemoRow;
