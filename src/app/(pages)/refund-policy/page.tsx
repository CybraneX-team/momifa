import React from 'react';
import { HideFooter } from '../../_components/HideFooter';

const Refund = () => {
  return (
    <div className="bg-[url('/media/pages-bg.png')] bg-no-repeat bg-cover bg-fixed">
    <div className="flex gap-8 p-8 max-w-7xl mx-auto pt-24 ">
      <div className="flex-1 space-y-8 ">
        <div>
          <h1 className=" text-4xl md:text-5xl font-bold mb-6 text-white">Refund Policy</h1>
        </div>

        <p className="text-[#a8a5a5]">
        If for any reason you are not satisfied with your purchase we ask that you please contact our support team here, to allow us the opportunity to help improve your experience. <br /><br />

All of our products carry a risk-free 30-day return and exchange window, with the exception of items marked as Final Sale. All items must be unworn (with the exception of trying on), unwashed, unaltered, and returned in their original packaging.

        </p>

            <h2 className="font-bold text-white uppercase">RETURNS FOR REFUND</h2>
        <p className="text-[#a8a5a5]">
        Any approved refund requests will be issued to the original form of payment, less the original shipping costs, if applicable.
        </p>

        <h2 className="font-bold text-white uppercase">EXCHANGE</h2>
        <p className="text-[#a8a5a5]">
        Any approved exchange will be shipped at no additional cost to you.

Please contact us through following email address. <br /><br />
<span className='font-bold'>returns@momifa.com</span> <br /><br />
For damaged/defective items also please contact us through following email address. <br /><br />
<span className='font-bold'>returns@momifa.com</span>
        </p>
        <h2 className="font-bold text-white uppercase">COMMON RETURN QUESTIONS</h2>
        <span className="font-semibold text-xs text-white uppercase">Can I return a sale item?</span>
        <p className="text-[#a8a5a5]">
        All orders are eligible for a return or exchange of any item within 30 days of purchase, with the exception of items marked as Final Sale (those Final Sale items will NOT be eligible for a return or exchange).<br /> <br />

        <span className="font-semibold text-xs text-white uppercase">What if I received a damaged or defective item?</span> <br /><br />
        Please contact our support team at support@momifa.com and we will take care of you, right away.<br /> <br />

        <span className="font-semibold text-xs text-white uppercase">If I am exchanging an item, when will I receive my exchange?</span> <br /><br />
        Once your return tracking is received, our automated system will process your replacement exchange order (US returns only). You will receive an automated email when your exchange has been processed.<br /> <br />

        <span className="font-semibold text-xs text-white uppercase">If I am returning an item for a refund, when will I receive my refund? For how much will the refund be?</span> <br /><br />
        Once your return tracking is received, we will process your refund and credit your original payment method. Please allow 3-5 business days for your refund to be processed by your bank. We will refund you for all items that are returned, less the original cost of shipping.<br /> <br />

International returns: It can take up to 21 business days for the funds to credit back to your original payment method once the items are received at the warehouse.

        </p>
        <h2 className="font-bold text-white uppercase">I HAVE NOT RECEIVED MY REFUND?</h2>
        <p className="text-[#a8a5a5]">
        <span className="font-semibold text-xs text-white uppercase">Can I return a sale item?</span> <br /><br />
        If you see a charge on your credit card for a canceled order, it is likely to be only pre-authorization and not a payment. This will be automatically canceled by your payment provider.<br /> <br />

If you paid by PayPal, then the canceled order should have automatically generated a refund back to your account.<br /> <br />

<span className="font-semibold text-xs text-white uppercase">Can I return a sale item?</span> <br /><br />
Please allow up to 7 business days for the funds to credit back to your payment method.
<br /> <br />

<span className="font-semibold text-xs text-white uppercase">PayPal Refunds</span> <br /><br />
These are usually immediate, so if you have received confirmation that a refund was issued but do not see it in your account, please contact us directly, so that we can investigate further.<br /> <br />

        </p>
      </div>

      <HideFooter />
    </div>
    </div>
  );
};

export default Refund;