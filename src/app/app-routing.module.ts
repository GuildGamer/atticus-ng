import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BlogComponent } from './blog/blog.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { CreateBlogPostComponent } from './create-blog-post/create-blog-post.component';
import { EditBlogPostComponent } from './edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchasedComponent } from './purchased/purchased.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'consultation', component: BookingComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'purchased', component: PurchasedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-blog-post', component: CreateBlogPostComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-post/:p_id', component: PostComponent },
  { path: 'edit-blog-post/:p_id', component: EditBlogPostComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// title/meta; initial APIData-s