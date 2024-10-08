import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, product }) {

    const { data, setData, post, errors, reset } = useForm({
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        purchase_price: product.purchase_price,
        selling_price: product.selling_price,
        picture: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('product.update', data));
    }

    const previewImage = (e) => {
        setData('picture', e.target.files[0])
        const image = document.querySelector('#picture');
        const imgPreview = document.querySelector('.img-preview');

        imgPreview.style.display = 'block';

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result;
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Product</h2>
                    <Link href={route('product')} className="btn btn-neutral btn-sm">
                        <i className='ri-arrow-left-fill'></i>
                        Return Back
                    </Link>
                </div>
            }
        >

            <Head title="Edit Product" />

            <div className="py-12">
                <div className="w-full px-2 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='max-w-7xl mx-auto px-10 py-6'>
                            <form onSubmit={onSubmit} method="POST" encType='multipart/form-data'>
                                <input type="text" name='id' className="input input-bordered w-full" defaultValue={data.id} hidden />
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Name:</span>
                                    </div>
                                    <input type="text" name='name' placeholder="Name" className="input input-bordered w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Category:</span>
                                    </div>
                                    <input type="text" name='category' placeholder="Category" className="input input-bordered w-full" value={data.category} onChange={(e) => setData('category', e.target.value)} required />
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.category}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Description:</span>
                                    </div>
                                    <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" defaultValue={data.description} onChange={(e) => setData('description', e.target.value)}></textarea>
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.description}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Purchase Price:</span>
                                    </div>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            Rp
                                        </div>
                                        <input type="number" min="0" name='purchase_price' placeholder="Purchase Price" className="input input-bordered w-full ps-10 p-2.5" value={data.purchase_price} onChange={(e) => setData('purchase_price', e.target.value)} required />
                                    </div>
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.purchase_price}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Selling Price:</span>
                                    </div>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            Rp
                                        </div>
                                        <input type="number" min="0" name='selling_price' placeholder="Selling Price" className="input input-bordered w-full ps-10 p-2.5" value={data.selling_price} onChange={(e) => setData('selling_price', e.target.value)} required />
                                    </div>
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.selling_price}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full mb-3">
                                    <div className="label">
                                        <span className="label-text dark:text-white font-semibold">Picture:</span>
                                    </div>
                                    <input type="file" id='picture' name='picture' placeholder="Picture" className="file-input file-input-bordered w-full" onChange={(e) => previewImage(e)} />
                                    <div className="avatar">
                                        <div className="w-fit max-h-64 rounded">
                                            {product.picture ? (
                                                <img src={`/storage/products/${product.picture}`} alt='product-picture' className="img-preview max-w-full h-auto mt-3 rounded-lg" />

                                            ) : (
                                                <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt='product-picture' className="img-preview max-w-full h-auto mt-3 rounded-lg" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="label">
                                        <span className="label-text-alt text-error">{errors.picture}</span>
                                    </div>
                                </label>
                                <button type='submit' className="btn btn-warning w-full">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
