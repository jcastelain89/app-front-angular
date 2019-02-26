import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable()
export class ProductsService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ProductsService');
    }

    getProducts(): Observable<Product[]> {
        return this.http
            .get<Product[]>('api/products')
            .pipe(catchError(this.handleError('getProducts', [])));
    }

    addProduct(product: Product): Observable<Product> {
        return this.http
            .post<Product>('api/product', product)
            .pipe(catchError(this.handleError('addProduct', product)));
    }

    deleteProduct(id: number): Observable<{}> {
        const url = `api/product/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteProduct')));
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http
            .put<Product>(`api/product/${product.id}`, product)
            .pipe(catchError(this.handleError('updateProduct', product)));
    }
}
