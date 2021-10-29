import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const strInsert = `
insert into Link (id, description, url, postedById, createdAt) values (1, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 'http://auda.org.au/orci/luctus/et.jsp', 1, '1617170773000');
insert into Link (id, description, url, postedById, createdAt) values (2, 'Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'https://earthlink.net/dictumst.json', 1, '1607565601000');
insert into Link (id, description, url, postedById, createdAt) values (3, 'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'http://vkontakte.ru/sit/amet.xml', 1, '1609838897000');
insert into Link (id, description, url, postedById, createdAt) values (4, 'Nulla tellus.', 'http://yellowbook.com/fringilla/rhoncus.json', 1, '1608959632000');
insert into Link (id, description, url, postedById, createdAt) values (5, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 'http://yahoo.co.jp/erat/curabitur/gravida/nisi/at/nibh/in.aspx', 1, '1602142209000');
insert into Link (id, description, url, postedById, createdAt) values (6, 'In congue. Etiam justo. Etiam pretium iaculis justo.', 'https://craigslist.org/fusce/lacus/purus/aliquet.png', 1, '1606664606000');
insert into Link (id, description, url, postedById, createdAt) values (7, 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'http://cornell.edu/a/pede/posuere/nonummy/integer/non/velit.png', 1, '1628091442000');
insert into Link (id, description, url, postedById, createdAt) values (8, 'Proin eu mi. Nulla ac enim.', 'http://reverbnation.com/ut/mauris/eget/massa/tempor/convallis.json', 1, '1631963795000');
insert into Link (id, description, url, postedById, createdAt) values (9, 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'https://irs.gov/rhoncus.jsp', 1, '1606986336000');
insert into Link (id, description, url, postedById, createdAt) values (10, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'https://unesco.org/massa/id/nisl/venenatis/lacinia.jpg', 1, '1621785792000');
insert into Link (id, description, url, postedById, createdAt) values (11, 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.', 'https://phpbb.com/odio/condimentum/id/luctus/nec.jpg', 1, '1630702820000');
insert into Link (id, description, url, postedById, createdAt) values (12, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', 'https://yahoo.com/amet/turpis/elementum/ligula/vehicula/consequat.html', 1, '1617522856000');
insert into Link (id, description, url, postedById, createdAt) values (13, 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', 'http://cbslocal.com/vitae/consectetuer.xml', 1, '1607283870000');
insert into Link (id, description, url, postedById, createdAt) values (14, 'Sed sagittis.', 'http://feedburner.com/leo/odio.xml', 1, '1614968765000');
insert into Link (id, description, url, postedById, createdAt) values (15, 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.', 'https://biblegateway.com/cras/mi/pede/malesuada/in/imperdiet/et.js', 1, '1606572412000');
insert into Link (id, description, url, postedById, createdAt) values (16, 'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'http://csmonitor.com/donec/posuere/metus/vitae/ipsum/aliquam.json', 1, '1607819382000');
insert into Link (id, description, url, postedById, createdAt) values (17, 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.', 'http://hhs.gov/mollis/molestie/lorem/quisque/ut/erat/curabitur.jsp', 1, '1607748003000');
insert into Link (id, description, url, postedById, createdAt) values (18, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.', 'https://timesonline.co.uk/duis/bibendum/felis/sed/interdum/venenatis.xml', 1, '1610455428000');
insert into Link (id, description, url, postedById, createdAt) values (19, 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.', 'http://linkedin.com/vestibulum/ante/ipsum.png', 1, '1621104314000');
insert into Link (id, description, url, postedById, createdAt) values (20, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.', 'http://techcrunch.com/in/porttitor.xml', 1, '1621068914000');
`;

async function main() {

  let pos = 1; 
  let posNext = 0;
  while( pos !== -1 ) {
    posNext = strInsert.indexOf('insert into', pos + 1); 
    const strQuery = strInsert.slice(pos, posNext);
    await prisma.$executeRawUnsafe(strQuery);
    pos = posNext;     
  }
};

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
