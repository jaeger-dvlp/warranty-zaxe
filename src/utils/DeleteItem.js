const deleteItem = async ({
  id,
  deviceSerialNumber,
  supaBase,
  getTableRows,
  updateAlertPopup,
}) => {
  try {
    const { error } = await supaBase
      .from('warrantyList')
      .delete()
      .match({ id });

    const TableElement = document.querySelector(
      `tr#list-item-${id}-${deviceSerialNumber}`
    );

    if (error)
      return updateAlertPopup({
        status: 'error',
        message: error?.message || 'An error occurred while deleting the item',
      });

    if (TableElement)
      TableElement.classList.add('max-h-[0px]', 'opacity-0', 'overflow-hidden');

    new Promise((resolve) => {
      setTimeout(() => resolve(), 750);
    }).then(() =>
      updateAlertPopup({
        status: 'success',
        message: 'Item deleted successfully.',
      })
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    }).then(() => getTableRows());
  } catch (error) {
    return false;
  }
};

export default deleteItem;
