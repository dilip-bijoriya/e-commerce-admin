import { Injectable, RendererFactory2 } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

@Injectable()
export class CustomModalService extends BsModalService {
  override config!: ModalOptions;
  constructor(rendererFactory: RendererFactory2, clf: ComponentLoaderFactory) {
    super(rendererFactory, clf, { ignoreBackdropClick: true });
  }
}
