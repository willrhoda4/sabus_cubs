





import cron from 'node-cron';
import meta from '../handlers/meta'; 

const { updateIGToken } = meta;

cron.schedule('0 0 1 * *', async () => {

  console.log('Refreshing Instagram token as per monthly chore list.');
  await updateIGToken();
});


