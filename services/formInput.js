'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.post('/insert', formInput);

  const db = fastify.db;

  async function formInput(req, rep) {
    db.tx('formInput', async (t) => {
      const autInput = await t.one(
        'INSERT INTO autoren(vorname, nachname, geburt, tod) VALUES($1, $2, $3, $4) RETURNING id',
        [
          req.body.author.vorname,
          req.body.author.nachname,
          req.body.author.geburt,
          req.body.author.tot,
        ],
      );

      const bookInput = await t.one(
        'INSERT INTO buecher(titel, jahr, verlag, autor_id) VALUES($1, $2, $3, $4) RETURNING id',
        [req.body.buchtitel, req.body.year, req.body.publisher, autInput.id],
      );

      req.body.zitate.map(async (zitat) => {
        await t.one(
          'INSERT INTO zitate(zitat, seitenzahl, autor_id, buch_id) VALUES($1, $2, $3, $4) RETURNING id',
          [zitat.text, zitat.seite, autInput.id, bookInput.id],
        );
      });
    });

    return formInput;
  }

  next();
};
