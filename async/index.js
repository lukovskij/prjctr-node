const util = require('util')
const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: "Robert"
      },
      {
        id: 2,
        name: "John"
      }
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2]
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: "Art of war"
      },
      {
        id: 2,
        name: "Hunger games"
      },
      {
        id: 3,
        name: "1984"
      }
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  }
};

const databaseMethods = Object.keys(database).reduce((acc, el) => {
	acc[el] = util.promisify(database[el])
	return acc
}, {})

const buyBookForUser = async (bookId, userId, callback) => {
  try {
    await databaseMethods['getUser'](userId);

    const userBooks = await databaseMethods['getUsersBook'](userId);

    if (userBooks.includes(bookId)) {
      return `User already has book with id=${bookId}`;
    } else {
      await databaseMethods['buyBook'](bookId);
      return "Success"
    }
  } catch (err) {
    return err
  }
};



(async () => {
const res =	await buyBookForUser(1, 1)
const res1 =	await	buyBookForUser(1, 2)
const res2 =	await	buyBookForUser(3, 2)
	
const res3 =	await	buyBookForUser(5, 2)
	
const res4 =	await	buyBookForUser(1, 3)
console.log('res=>', res,'res1=>',res1, 'res2=> ',res2, 'res3=> ',res3, 'res4=> ',res4)
})()
