import React from 'react';
import { X, Download, Printer, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-3xl overflow-hidden relative z-10 shadow-2xl rounded-sm flex flex-col max-h-[90vh]"
          >
            {/* Header / Actions */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-4">
                 <button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white border border-gray-200 px-4 py-2 hover:bg-gray-100 transition-colors">
                   <Printer className="w-3.5 h-3.5" /> Print
                 </button>
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">
                   <Download className="w-3.5 h-3.5" /> Download PDF
                 </button>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="flex-1 overflow-y-auto p-12 bg-white font-serif">
              <div className="flex justify-between items-start mb-16">
                 <div>
                    <h1 className="text-[32px] font-black tracking-tighter uppercase mb-2 font-sans">ATTIRE</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-sans">Premium Satorial Excellence</p>
                 </div>
                 <div className="text-right">
                    <h2 className="text-[20px] font-black uppercase tracking-widest mb-1 font-sans">Invoice</h2>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 font-sans">#{order.id}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-20 mb-16">
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4 font-sans">Billed To</p>
                    <p className="text-[14px] font-bold uppercase mb-1">Brijesh Guest</p>
                    <p className="text-[11px] text-gray-500 uppercase leading-relaxed">
                       123 Fashion Street, Suite 400<br/>
                       Manhattan, New York 10001<br/>
                       United States
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4 font-sans">Order Details</p>
                    <div className="space-y-1">
                       <p className="text-[11px] uppercase"><span className="font-bold font-sans">Date:</span> {order.date}</p>
                       <p className="text-[11px] uppercase"><span className="font-bold font-sans">Payment:</span> {order.paymentMethod}</p>
                       <p className="text-[11px] uppercase"><span className="font-bold font-sans">Delivery:</span> {order.deliveryDate}</p>
                    </div>
                 </div>
              </div>

              <table className="w-full mb-16">
                 <thead>
                    <tr className="border-b-2 border-black">
                       <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest font-sans">Item Description</th>
                       <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest font-sans">Price</th>
                       <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest font-sans">Qty</th>
                       <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest font-sans">Total</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                       <tr key={item.id}>
                          <td className="py-6">
                             <p className="text-[12px] font-bold uppercase mb-1">{item.name}</p>
                             <p className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">Size: {item.size} | Color: {item.color}</p>
                          </td>
                          <td className="text-right text-[12px] uppercase">${item.price.toFixed(2)}</td>
                          <td className="text-right text-[12px] uppercase">01</td>
                          <td className="text-right text-[12px] font-bold uppercase">${item.price.toFixed(2)}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>

              <div className="flex justify-end border-t-2 border-black pt-8">
                 <div className="w-64 space-y-3">
                    <div className="flex justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-sans">Subtotal</span>
                       <span className="text-[12px] uppercase">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-sans">Shipping</span>
                       <span className="text-[12px] uppercase text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-100">
                       <span className="text-[12px] font-black uppercase tracking-widest font-sans">Grand Total</span>
                       <span className="text-[16px] font-black uppercase">${order.total.toFixed(2)}</span>
                    </div>
                 </div>
              </div>

              <div className="mt-20 pt-10 border-t border-dashed border-gray-200">
                 <p className="text-[9px] text-center text-gray-400 uppercase tracking-[0.3em] font-sans">
                    Thank you for choosing Attire Fashion. This is a computer generated invoice.
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvoiceModal;
