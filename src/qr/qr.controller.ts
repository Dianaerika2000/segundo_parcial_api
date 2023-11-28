import { Controller, Get, Query } from '@nestjs/common';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  async generateQrCode(@Query('data') data: string) {
    const qrCodeDataURL = await this.qrService.generateQrCode(data);
    return `<img src="${qrCodeDataURL}" alt="QR Code" />`;
  }
}
