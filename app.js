var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Telegraf = require('telegraf');
const bot = new Telegraf('828756134:AAEEHuHrJHwNmxs4e95UbfEQC6Nc4HLMQKU');
var Usuario = require('./models/usuario')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv').config();
require('./db')
var app = express();

app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://7f399729.ngrok.io/secret-path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

bot.use(async (ctx, next) => {

  console.log(ctx.from); 

  const rows = await Usuario.getById(ctx.from.id);
  console.log(rows);
  if(rows === undefined){
    const result = await Usuario.insert({
      username: ctx.from.username, 
      first_name: ctx.from.first_name, 
      last_name: ctx.from.last_name, 
      telegram_id: ctx.from.id
    })
  }

  await next();

});

bot.command('hola', (ctx) => ctx.reply('Hola jovenzuel@'));
bot.command('adios', (ctx) => ctx.reply('Adios hij@ abrigate que hace fresco'));
bot.command('tiempo', (ctx) => ctx.reply('Me da a mi que va a llover porque me duelen las rodillas... https://www.eltiempo.es/'));
bot.command('info', (ctx) => ctx.reply('/info, /creators, /hola, /adios ,/comoestas, /tiempo, /edad, /chiste, /fea, /hambre, /fiesta, /ropa, /ducha, /bodega, /vino, /chica, /farmacia, /cama, /sabanas, /guapa, /navidad, /comida'));
bot.command('edad', (ctx) => ctx.reply('naci en  el primer solsticio de invierno posterior a la segunda gran guerra'));
bot.command('chiste', (ctx) => ctx.reply('Sr. Shrödinger, su gato ha sufrido un accidente. Tengo buenas y malas noticias...'));
bot.command('creators', (ctx) => ctx.reply('Sergio, Diego, Nestor y Javi'));
bot.command('comoestas', (ctx) => ctx.reply('Pues con este frio me duelen los juanetes'));
bot.command('fea', (ctx) => ctx.reply('Mira te meto un guantazo que te salto los dientes'));
bot.command('hambre', (ctx) => ctx.reply('¿Tienes hambre? ¿Quieres un huevo?'));
bot.command('fiesta', (ctx) => ctx.reply('No vuelvas tarde y ten cuidao eeh hij@ mi@, que hay mucho gamberro por ahí'));
bot.command('ropa', (ctx) => ctx.reply('Eres un guarro, te la lavas tú en el río, so cerdo'));
bot.command('ducha', (ctx) => ctx.reply('está el agua fría eeh y a ver si me pones los patitos pa no resbalarme que la ultima vez me rompí la cadera'));
bot.command('bodega', (ctx) => ctx.reply('traéte una de tinto cuando vayas, y otra de blanco pa cocináh'));
bot.command('vino', (ctx) => ctx.reply('estás hecho un borrachín'));
bot.command('chica', (ctx) => ctx.reply('traela a cenar y así conozco a la chiquilla, que parece mu guapa y lozana'));
bot.command('farmacia', (ctx) => ctx.reply('habrás comprado las gomitas no? siendo un caballero como eres...'));
bot.command('cama', (ctx) => ctx.reply('Ya tienes las sábanas limpias nen@'));
bot.command('sabanas', (ctx) => ctx.reply('ya las puedes ir cambiando que huelen a choto renegrío'));
bot.command('guapa', (ctx) => ctx.reply('Antes si que era guapa'));
bot.command('navidad', (ctx) => ctx.reply('Ay hij@ seguro que estas sean mis últimas Navidades'));
bot.command('comida', (ctx) => ctx.reply('Que delgad@ estás, no comes nada, a saber lo que te dan de comer en el trabajo'));




app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
