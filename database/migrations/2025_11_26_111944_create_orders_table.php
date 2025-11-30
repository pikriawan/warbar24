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
            $table->foreignId('admin_id')->nullable()->constrained('admins');
            $table->string('session_id')->nullable();
            $table->string('table_number')->default(1);
            $table->enum('status', ['pending', 'processing', 'completed', 'canceled'])->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamp('canceled_at')->nullable();
            $table->timestamps();

            $table->foreign('session_id')
                ->references('id')
                ->on('sessions')
                ->onDelete('cascade');
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
