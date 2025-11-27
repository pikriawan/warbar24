<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('admin_id')->constrained('admins');
            $table->string('table_number');
            $table->enum('status', ['pending', 'processing', 'completed', 'canceled']);
            $table->text('notes');
            $table->timestamp('processed_at');
            $table->timestamp('finished_at');
            $table->timestamp('canceled_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
