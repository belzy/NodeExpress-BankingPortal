const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = 3000;

const app = express();

const accountData = fs.readFileSync(
  path.join(__dirname, 'json', 'accounts.json'), 
  'UTF-8',
);
const accounts = JSON.parse(accountData);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname, 'public')));

const userData = fs.readFileSync(
  path.join(__dirname, 'json', 'users.json'), 
  'UTF-8'
);
const users = JSON.parse(userData);
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Account Summary',
    accounts: accounts,
  });
});

app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  });
});
app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  });
});
app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  });
});
app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});
app.listen(PORT, () => {
  console.log(`PS Project running on port ${ PORT }!`);
});