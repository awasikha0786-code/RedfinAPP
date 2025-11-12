import React, { useMemo, useRef } from 'react';
import ListingDetailsForm from '../../../../components/main/profile/ListingDetailsForm';

const AddListingDetailsScreen = ({ navigation, route }) => {
  const latestValuesRef = useRef({});

  const initialValues = useMemo(
    () => ({
      sellPrice: route?.params?.sellPrice,
      rentPrice: route?.params?.rentPrice,
      rentInterval: route?.params?.rentInterval,
      features: route?.params?.features,
      totalRooms: route?.params?.totalRooms,
      facilities: route?.params?.facilities,
    }),
    [route?.params]
  );

  const handleSubmit = (values) => {
    latestValuesRef.current = values;
  };

  const handleSuccessConfirm = () => {
    const { mode, ...formValues } = latestValuesRef.current || {};
    navigation.navigate('AddPaymentMethod', {
      ...route?.params,
      ...formValues,
    });
  };

  return (
    <ListingDetailsForm
      headerTitle="Add Listing"
      mode="add"
      initialValues={initialValues}
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
      onSuccessSecondary={() => {}}
      onSuccessConfirm={handleSuccessConfirm}
      onErrorPrimary={() => navigation.goBack()}
      secondaryActionLabel="Add More"
      successConfig={{
        title: 'Your listing is now',
        highlightText: 'published',
        warningText: 'Lorem ipsum dolor sit amet, consectetur.',
        cancelText: 'Add More',
        confirmText: 'Finish',
      }}
      errorConfig={{
        title: 'Oops! Something went',
        highlightText: 'wrong',
        warningText: 'Please go back and fix the highlighted details.',
        cancelText: 'Back to Listing',
      }}
    />
  );
};

export default AddListingDetailsScreen;

