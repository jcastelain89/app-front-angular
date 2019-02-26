import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
    products: Product[];
    editProduct: Product;

    constructor(private productService: ProductsService) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => (this.products = products));
    }

    add(title: string): void {
        this.editProduct = undefined;
        title = title.trim();
        if (!title) {
            return;
        }
        const newProduct: Product = { title } as Product;
        this.productService.addProduct(newProduct).subscribe(product => this.products.push(product));
    }

    edit(product: Product): void {
        this.editProduct = product;
    }

    update(): void {
        if (this.editProduct) {
            this.productService.updateProduct(this.editProduct).subscribe(product => {
                const ix = product ? this.products.findIndex(p => p.id === product.id) : -1;
                if (ix > -1) {
                    this.products[ix] = product;
                }
            });
            this.editProduct = undefined;
        }
    }

    delete(product: Product): void {
        this.products = this.products.filter(p => p !== product);
        this.productService.deleteProduct(product.id).subscribe();
    }
}
