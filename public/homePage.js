const logoutBtn = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

favoritesWidget.removeUserCallback = (userId) => {
    ApiConnector.removeUserFromFavorites(userId, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
};

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
};
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

ApiConnector.current(
    (response) => response.success && ProfileWidget.showProfile(response.data),
);
logoutBtn.action = () => {
    ApiConnector.logout((response) => response.success && location.reload);
};

function handleResponseGetRates(response) {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
}

function getRates() {
    ApiConnector.getStocks(handleResponseGetRates);
}

getRates();
setInterval(() => {
    getRates();
}, 60000);
