import { Invoice } from 'invoice/entities/invoice.entity';
import { CrudService } from 'shared/services/crud.service';

export class InvoicesService extends CrudService<Invoice>(Invoice) {}
