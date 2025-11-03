package com.aharrar.demo_spring_angular.services;

import com.aharrar.demo_spring_angular.entities.Payment;
import com.aharrar.demo_spring_angular.entities.PaymentStatus;
import com.aharrar.demo_spring_angular.entities.PaymentType;
import com.aharrar.demo_spring_angular.entities.Student;
import com.aharrar.demo_spring_angular.repository.PaymentRepository;
import com.aharrar.demo_spring_angular.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    private StudentRepository studentRepository;

    private PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    public Payment savePayment(MultipartFile file, LocalDate date, double amount, PaymentType type, String studentCode) throws Exception{
        Path folderPath = Paths.get(System.getProperty("user.home"),"Aharrar-data","payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String filesName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"Aharrar-data","payments",filesName + ".pdf");
        Files.copy(file.getInputStream(),filePath);
        Student student = studentRepository.findByCode(studentCode);
        Payment payment = Payment.builder()
                .date(date).type(type).student(student)
                .amount(amount)
                .file(filePath.toUri().toString())
                .status(PaymentStatus.CREATED)
                .build();
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(PaymentStatus status,Long id){
        Payment payment = paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public byte[] getPaymentFile(Long paymentId) throws Exception{
        Payment payment = paymentRepository.findById(paymentId).orElse(null);
        assert payment != null;
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }

}
