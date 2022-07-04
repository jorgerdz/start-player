import { publish } from 'gh-pages';

publish(
 'dist',
 {
  branch: 'gh-pages',
  repo: 'https://github.com/jorgerdz/start-player.git',
  user: {
   name: 'Jorge Rodriguez',
   email: 'jorgecrb@gmail.com'
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);