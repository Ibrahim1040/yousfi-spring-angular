package com.aharrar.demo_spring_angular;

import com.aharrar.demo_spring_angular.entities.Payment;
import com.aharrar.demo_spring_angular.entities.PaymentStatus;
import com.aharrar.demo_spring_angular.entities.PaymentType;
import com.aharrar.demo_spring_angular.entities.Student;
import com.aharrar.demo_spring_angular.repository.PaymentRepository;
import com.aharrar.demo_spring_angular.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class DemoSpringAngularApplication {

	public static void main(String[] args) {

        SpringApplication.run(DemoSpringAngularApplication.class, args);
	}

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository){
        return args -> {
            studentRepository.save(Student.builder()
                    .firstName("Mohamed")
                    .code("112233")
                    .programId("SDIA")
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Imane")
                    .code("112244")
                    .programId("SDIA")
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Hamza")
                    .code("112255")
                    .programId("SADO")
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Oumayma")
                    .code("112266")
                    .programId("TUVA")
                    .build());



            PaymentType[] paymentTypes = PaymentType.values();
            Random random = new Random();
            studentRepository.findAll().forEach(st->{
                for(int i = 0;i < 10;i++){
                    int index = random.nextInt(paymentTypes.length);
                    Payment payment = Payment.builder()
                            .amount(1000+(int)(Math.random()+2000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });
        };
    }

}


